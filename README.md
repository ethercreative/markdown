# Markdown for Craft CMS

### How-to
Clone this repo into `craft/plugins/markdown` & create a new **Markdown** field.
 
The field will return an array containing `raw` (the raw markdown) and `parsed` (the parsed markdown as HTML). This means you can use `{{ myMarkdownField.parsed|raw }}` to display the parsed markdown in your template. Remember the `|raw` pipe!

*([Markdown Extra](https://michelf.ca/projects/php-markdown/extra/) is also supported!)*

![Markdown Field](resources/imgs/preview.png "Markdown for Craft CMS")

---
Copyright © 2016 [Ether Creative](http://ethercreative.co.uk) <hello@ethercreative.co.uk>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.