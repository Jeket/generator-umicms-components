<?php
/**
 * module: 	<%= title %> (<%= safeModuleName %>)
 * author: 	<%= authorName %> <<%= authorEmail %>>
 * url:		<%= authorURL %>
 * github:	<%= authorGitHub %>
 * company:	<%= authorCompanyName %>
 */
abstract class __<%= safeModuleName %> extends baseModuleAdmin {

	/**
	 * config this module
	 * @return [type] [description]
	 */
	public function config() {
		$regedit	= regedit::getInstance();
		$params		= array(
			'config' => array(
				// 'string:login' => NULL
			)
		);
		$mode 		= getRequest("param0");

		if($mode == "do") {
			$params = $this->expectParams($params);
			// $regedit->setVar("//modules/<%= safeModuleName %>/login", $params['config']['string:login']);
			$this->chooseRedirect();
		}

		// $params['config']['string:login'] =  $regedit->getVal("//modules/<%= safeModuleName %>/login");

		$this->setDataType("settings");
		$this->setActionType("modify");

		$data = $this->prepareData($params, "settings");

		$this->setData($data);
		return $this->doData();
	}

	/**
	 * default admin method
	 * @return [type] [description]
	 */
	public function lists(){
		$this->setDataType("list");
		$this->setActionType("view");

		if($this->ifNotXmlMode())
			return $this->doData();

		$limit		= getRequest('per_page_limit');
		$curr_page	= getRequest('p');
		$offset		= $curr_page * $limit;

		$sel = new selector('objects');
		$sel->types('object-type')->name('<%= safeModuleName %>', 'item_element'); //put your data type
		$sel->limit($offset, $limit);

		selectorHelper::detectFilters($sel);

		$data = $this->prepareData($sel->result, "objects");

		$this->setData($data, $sel->length);
		$this->setDataRangeByPerPage($limit, $curr_page);
		return $this->doData();
	}

	/**
	 * for SMC
	 * @param  string $param [description]
	 * @return [type]        [description]
	 */
	public function getDatasetConfiguration($param = '') {
		$result = array(
			'methods'	=> array(
				array(
					'title'		=> getLabel('smc-load'),
					'forload'	=> true,
					'module'	=> '<%= safeModuleName %>',
					'#__name'	=> 'lists'
				),
				array(
					'title'		=> getLabel('smc-delete'),
					'module'	=> '<%= safeModuleName %>',
					'#__name'	=> 'del',
					'aliases'	=> 'tree_delete_element,delete,del'
				),
				array(
					'title'		=> getLabel('smc-activity'),
					'module'	=> '<%= safeModuleName %>',
					'#__name'	=> 'activity',
					'aliases'	=> 'tree_set_activity,activity'
				)
			),
			'types'		=> array(
				array(
					'common'	=> 'true',
					'id'		=> 'item_element'
				)
			),
			'stoplist'	=> array('<%= safeModuleName %>hierarchy'),
			'default' 	=> ''
		);
		return $result;
	}

};
