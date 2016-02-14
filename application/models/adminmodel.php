<?php
class adminmodel extends CI_Model {

        public function __construct()
        {       
                parent::__construct();
                $this->load->database();
        }

        public function adminLogin($UserName,$PassWord){
                $data = array(
                        "UserName"=>$UserName,
                        "PassWord"=>md5($PassWord)
                );
                $this->db->where($data);
                $this->db->from('login');

                $query = $this->db->get();
                return $query->result_array();
        }

}