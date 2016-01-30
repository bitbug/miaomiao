<?php
class newsmodel extends CI_Model {

        public function __construct()
        {
                $this->load->database();
        }

        public function getAllArticle($filter)
	{       
                $this->db->where($filter);
                $this->db->from('news');
                $this->db->join('e_entity','e_entity.Id = news.Author');

                $query = $this->db->get();
                return $query->result_array();
	}
        public function updateArticle($data,$ArticleId){
                $this->db->where("ArticleId",$ArticleId);
                $this->db->update("news",$data);
                return "ok";
        }
}