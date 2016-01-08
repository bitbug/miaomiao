<?php
class usermodel extends CI_Model {

        public function __construct()
        {       
                parent::__construct();
                $this->load->database();
        }

        public function adminLogin($data){
                $this->db->where($data);
                $this->db->from('e_entity');

                $query = $this->db->get();
                return $query->result_array();
        }
}