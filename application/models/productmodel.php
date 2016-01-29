<?php
class productmodel extends CI_Model {

        public function __construct()
        {       
                parent::__construct();
                $this->load->database();
        }
        public function createProduct($data){
                $this->db->insert('e_listing',$data);
                $query = $this->db->insert_id();

                return $query;
        }
        public function getProductList($data){
                $this->db->where($data);
                $this->db->from('e_listing');
                $this->db->join('e_entity','e_entity.Id = e_listing.UserCreated');

                $query = $this->db->get();
                return $query->result_array();
        }
        public function updateProductItem($data,$Id){
                $this->db->where("ProductId",$Id);
                $this->db->update("e_listing",$data);
                return "ok";
        }
        public function getProductsByUser($filter){
                $this->db->where($filter);
                $this->db->from('e_listing');

                $query = $this->db->get();
                return $query->result_array();
        }     
}