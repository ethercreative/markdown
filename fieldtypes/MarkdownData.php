<?php

namespace Craft;

class MarkdownData extends \Twig_Markup
{
	// Properties
	// =========================================================================

	/**
	 * @var
	 */
	private $_pages;

	/**
	 * @var string
	 */
	private $_rawContent;

	// Public Methods
	// =========================================================================

	/**
	 * Constructor
	 *
	 * @param string $content
	 * @param string $charset
	 *
	 * @return MarkdownData
	 */
	public function __construct($content, $charset)
	{
		// Save the raw content in case we need it later
		$this->_rawContent = $content;

		// Parse the markdown & ref tags
		$content = craft()->elements->parseRefs(craft()->markdown->parseText($content));
		parent::__construct($content, $charset);
	}

	/**
	 * Returns the raw content, with reference tags still in-tact.
	 *
	 * @return string
	 */
	public function getRawContent()
	{
		return $this->_rawContent;
	}

	/**
	 * @return string
	 */
	public function __toString()
	{
		return str_replace("{pagebreak}", '', $this->content);
	}

	/**
	 * Returns the parsed content, with reference tags returned as HTML links.
	 *
	 * @return string
	 */
	public function getParsedContent()
	{
		return $this->__toString();
	}

	/**
	 * Returns an array of the individual page contents.
	 *
	 * @return array
	 */
	public function getPages()
	{
		if (!isset($this->_pages))
		{
			$this->_pages = array();
			$pages = explode('{pagebreak}', $this->content);

			foreach ($pages as $page)
			{
				$this->_pages[] = new \Twig_Markup($page, $this->charset);
			}
		}

		return $this->_pages;
	}

	/**
	 * Returns a specific page.
	 *
	 * @param int $pageNumber
	 *
	 * @return string|null
	 */
	public function getPage($pageNumber)
	{
		$pages = $this->getPages();

		if (isset($pages[$pageNumber - 1]))
		{
			return $pages[$pageNumber - 1];
		}
	}

	/**
	 * Returns the total number of pages.
	 *
	 * @return int
	 */
	public function getTotalPages()
	{
		return count($this->getPages());
	}
}