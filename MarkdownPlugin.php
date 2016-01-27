<?php

namespace Craft;

/**
 * Markdown for Craft CMS
 *
 * @author    Ether Creative <hello@ethercreative.co.uk>
 * @copyright Copyright (c) 2016, Ether Creative
 * @license   http://ether.mit-license.org/
 * @since     1.0
 */
class MarkdownPlugin extends BasePlugin {

	public function getName()
	{
		return 'Markdown';
	}

	public function getDescription()
	{
		return 'A markdown input for Craft CMS';
	}

	public function getVersion()
	{
		return '1.1.1';
	}

	public function getDeveloper()
	{
		return 'Ether Creative';
	}

	public function getDeveloperUrl()
	{
		return 'http://ethercreative.co.uk';
	}

}