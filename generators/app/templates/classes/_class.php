<?php
/**
 * module: 		<%= title %> (<%= safeModuleName %>)
 * author: 		<%= authorName %> <<%= authorEmail %>>
 * url:			<%= authorURL %>
 * github:		<%= authorGitHub %>
 * company:		<%= authorCompanyName %>
 * description: Main class for this module.
 */
class <%= safeModuleName %> extends def_module {

	public $per_page;

	public function __construct() {
		parent::__construct();

		$this->loadCommonExtension();

		if(cmsController::getInstance()->getCurrentMode() == "admin") {
			$configTabs = $this->getConfigTabs();
			if ($configTabs) {
				$configTabs->add("config");
			}

			$this->__loadLib("__admin.php");
			$this->__implement("__<%= safeModuleName %>");

			$this->__loadLib("__events.php");
			$this->__implement("__<%= safeModuleName %>_events");

			$this->loadAdminExtension();
		}
		$this->__loadLib("__custom.php");
		$this->__implement("__custom_<%= safeModuleName %>");

		$this->loadSiteExtension();
	}

	public function config() {
		return __<%= safeModuleName %>::config();
	}

	public function getObjectEditLink($objectId, $type = false) {
		return $this->pre_lang . "/admin/<%= safeModuleName %>/edit/" . $objectId . "/";
	}


	/**
	 * default client-side method
	 * @return [type] [description]
	 */
	public function show(){
		# code...
	}

};
