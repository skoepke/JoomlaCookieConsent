<?php
/**
 * User: Sebastian Köpke
 * Date: 09.09.15
 * Time: 11:12
 * File: cookieconsent.php
 *
 * Copyright © 2015 Sebastian Köpke
 * All rights reserved.
 *
 */

defined('_JEXEC') or die;


if(isset($_COOKIE['sz_mcc_dismissed']) && is_string($_COOKIE['sz_mcc_dismissed'])) return;

// Attributes
$theme      = $params->get('theme','dark');
$position   = $params->get('position','bottom');
$message   = $params->get('message','Cookies erleichtern die Bereitstellung dieser Webseite. Mit der Nutzung unserer Webseite erklären Sie sich damit einverstanden, dass wir Cookies verwenden.');
$leanMoreLabel  = $params->get('learnMore','Weitere Informationen');
$linkUrl        = $params->get('link','\datenschutz');
$dismissLabel   = $params->get('dismiss','Verstanden');

$loadJQuery = ((int)$params->get('loadjquery', 0)) > 0;

$document = JFactory::getDocument();

if ( $loadJQuery ) {
    JHtml::_('jquery.framework');
}


$document->addStyleSheet("modules/mod_cookieconsent/css/theme/".$theme.".css");
$document->addStyleSheet("modules/mod_cookieconsent/css/position/".$position.".css");

$document->addScript("modules/mod_cookieconsent/js/consent.js");


$sInitScript = 'window.sz_mcc_options = {
            message:\''.$message.'\',
            learnMore: \''.$leanMoreLabel.'\',
            link:\''.$linkUrl.'\',
            dismiss:\''.$dismissLabel.'\'
}';

$document->addScriptDeclaration($sInitScript);