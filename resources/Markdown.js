// innerText polyfill for Firefox
if ( (!('innerText' in document.createElement('a'))) && ('getSelection' in window) ) {
	HTMLElement.prototype.__defineGetter__("innerText", function() {
		var selection = window.getSelection(),
			ranges    = [],
			str;

		// Save existing selections.
		for (var i = 0; i < selection.rangeCount; i++) {
			ranges[i] = selection.getRangeAt(i);
		}

		// Deselect everything.
		selection.removeAllRanges();

		// Select `el` and all child nodes.
		// 'this' is the element .innerText got called on
		selection.selectAllChildren(this);

		// Get the string representation of the selected nodes.
		str = selection.toString();

		// Deselect everything. Again.
		selection.removeAllRanges();

		// Restore all formerly existing selections.
		for (var i = 0; i < ranges.length; i++) {
			selection.addRange(ranges[i]);
		}

		// Oh look, this is what we wanted.
		// String representation of the element, close to as rendered.
		return str;
	})
}

// Reference Autocomplete
(function(mod) {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		mod(require("../../lib/codemirror"));
	else if (typeof define == "function" && define.amd) // AMD
		define(["../../lib/codemirror"], mod);
	else // Plain browser env
		mod(CodeMirror);
})(function(CodeMirror) {
	"use strict";

	CodeMirror.registerHelper("hint", "markdown", function(editor, options) {
		var cur = editor.getCursor();
		var ret = {list: ['entry','asset','user','tag','category','pagebreak'], from: CodeMirror.Pos(cur.line, cur.ch), to: CodeMirror.Pos(cur.line, cur.ch)};
		CodeMirror.on(ret, "pick", function(picked) {
			if (picked === 'pagebreak') {
				var c = editor.getCursor();
				editor.setCursor(c.line, c.ch + 1);
				return;
			}

			Markdown.showReferenceModal(editor, picked);
		});
		return ret;
	});
});

var Markdown = function (id) {
	var self = this;

	// Textarea
	this.ta = document.getElementById(id);

	// Editor
	this.editor = CodeMirror.fromTextArea(document.getElementById(id), {
		mode: 'markdown',
		lineNumbers: false,
		theme: 'house',
		lineWrapping: true,
		autoCloseBrackets: true,
		extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
	});

	this.editor.on("keyup", function (cm, event) {
		var cur = cm.getCursor();
		if (!cm.state.completionActive && event.keyCode != 13 && event.keyCode != 27 && cm.getLine(cur.line)[cur.ch - 1] === "{") {
			CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
		}
	});

	this.editor.on('change', function () {
		self.editor.save();
	});

	this.editor.on('update', function () {
		self.editor.save();
	});

	this.editor.on('blur', function () {
		self.editor.save();
	});

	// Something's fucky with the DOM, so we have to refresh CodeMirror to get it to load the content.
	setTimeout(function () {
		self.editor.refresh();
	}, 1);

	Craft.livePreview.on('enter', function () {
		self.editor.refresh();
	});

	Craft.livePreview.on('exit', function () {
		self.editor.refresh();
	});

	// MD Help Modal
	var help = document.createElement('div');
	help.classList.add('modal');
	help.classList.add('house--modal');
	help.classList.add('fitted');
	help.innerHTML = document.getElementById(id + '-help').innerHTML;
	this.helpModal = new Garnish.Modal(help, {
		autoShow: false
	});
	help.getElementsByTagName('input')[0].addEventListener('click', function () {
		self.helpModal.hide();
	});

	// MD Help Button
	var helpBtn = document.createElement('button');
	helpBtn.classList.add('house--help-btn');
	helpBtn.textContent = "?";
	helpBtn.title = "Markdown Help";
	helpBtn.addEventListener('click', function (e) {
		e.preventDefault();
		self.helpModal.show();
	});
	this.ta.parentNode.parentNode.firstElementChild.appendChild(helpBtn);
};

/**
 * Reference Tag Modal
 *
 * @param {CodeMirror} editor
 * @param {String} type - Entry|User|Asset|Tag|Category
 */
Markdown.showReferenceModal = function (editor, type) {
	var didSelect = false;

	Craft.createElementSelectorModal(type.charAt(0).toUpperCase() + type.slice(1),
		{
			multiSelect: true,
			onSelect: function(elements)
			{
				didSelect = true;
				var tags = "", tag;

				for (var i = 0; i < elements.length; i++) {
					tag		= type.toLowerCase() + ":" + elements[i].id;
					tags	= tags + "{" + tag + "}"
				}

				tags = tags.substring(1 + type.length).slice(0, -1);

				editor.replaceSelection(tags);
			},
			// Remove the text added by auto-complete if the user cancels
			onHide: function () {
				if (!didSelect) editor.execCommand('undo');
			}
		});
};