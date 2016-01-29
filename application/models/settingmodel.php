<?php
class settingmodel extends CI_Model {

        public function __construct()
        {       
                parent::__construct();
                $this->load->database();
        }
        public function getMembershipSetting(){
                $query = $this->db->get('t_membership');
                return $query->result_array();
        }
        public function updateMembershipSetting($data,$Level){
        		$this->db->where("Level",$Level);
                $this->db->update("t_membership",$data);
                return "ok";
        }
}