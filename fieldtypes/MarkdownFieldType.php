<?php

namespace Craft;

class MarkdownFieldType extends BaseFieldType {

	public function getName()
	{
		return Craft::t('Markdown');
	}

	public function defineContentAttribute()
	{
		return array(AttributeType::String, 'column' => ColumnType::Text);
	}

	public function getInputHtml($name, $value)
	{
		$id = craft()->templates->formatInputId($name);
		$namespacedId = craft()->templates->namespaceInputId($id);

		craft()->templates->includeCssResource('markdown/lib/codemirror.css');
		craft()->templates->includeJsResource('markdown/lib/codemirror.js');
		craft()->templates->includeJsResource('markdown/lib/md.js');
		craft()->templates->includeJsResource('markdown/lib/show-hint.js');
		craft()->templates->includeJsResource('markdown/lib/closebrackets.js');
		craft()->templates->includeJsResource('markdown/lib/continuelist.js');

		craft()->templates->includeCssResource('markdown/Markdown.css');
		craft()->templates->includeJsResource('markdown/Markdown.js');
		craft()->templates->includeJs("new Markdown('{$namespacedId}');");

		return craft()->templates->render('markdown/markdown-fieldtype', array(
			'id'  => $id,
			'name'  => $name,
			'value' => $value
		));
	}

	public function prepValue($value)
	{
		return array(
			'raw' => $value,
			'parsed' => craft()->elements->parseRefs(craft()->markdown->parseText($value))
		);
	}

}