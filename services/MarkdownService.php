<?php

namespace Craft;

class MarkdownService extends BaseApplicationComponent {

	/**
	 * Parses some text.
	 *
	 * @param string $text
	 * @return string
	 */
	public function parseText($text)
	{
		return $this->_getParsedown()->text($text);
	}

	/**
	 * Returns a new ParsedownExtra instance.
	 *
	 * @access private
	 * @return \ParsedownExtra
	 */
	private function _getParsedown()
	{
		if (!class_exists('\ParsedownExtra'))
		{
			require_once craft()->path->getPluginsPath().'markdown/vendor/autoload.php';
		}
		return new \ParsedownExtra();
	}

}