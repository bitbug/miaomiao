<?php
class productmodel extends CI_Model {

        public function __construct()
        {       
                parent::__construct();
                $this->load->database();
        }

        public function getSellingList($data){
                $this->db->where($data);
                $this->db->from('e_listing');

                $query = $this->db->get();
                return $query->result_array();
        }

}