<?php
class productmodel extends CI_Model {

        public function __construct()
        {       
                parent::__construct();
                $this->load->database();
        }
        public function getProductById($data){
            $this->db->where($data);
            $this->db->from('e_listing');
            $this->db->join('e_entity','e_entity.Id=e_listing.UserCreated');
            $query = $this->db->get();

            return $query->result_array();
        }
        public function createProduct($data){
                $this->db->insert('e_listing',$data);
                $query = $this->db->insert_id();

                return $query;
        }
        public function getSearchResult($Query,$ProductType,$Type){
                $sql = "select * from e_listing where concat(NameUni,LocationUni) like '%".$Query."%' and Type=? and ProductType=? and DateVoid is NULL";
                $data = array($Type,$ProductType);
                $query = $this->db->query($sql,$data);
                return $query->result_array();
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
        public function addFile($UserId, $ProductId, $FilePath, $FileName, $FileType) {
        $date = date('Y-m-d');
        $sql = "INSERT INTO t_document (UserId, ProductId, FilePath, FileName, FileType, FileDateCreated, FileDateVoid) VALUES (?,?,?,?,?,?,?) ";
        $data = array(
                $UserId,
                $ProductId,
                $FilePath,
                $FileName,
                $FileType,
                $date,
                NULL
        );

        $insertQuery = $this->db->query($sql, $data);
        $query = $this->db->insert_id();
        return $query;
    }
    public function getProductPhoto($FileType,$ProductId){
        $sql = "SELECT * FROM t_document WHERE FileType = ? AND ProductId = ? AND FileDateVoid IS NULL";
        $data = array($FileType,$ProductId);

        $query = $this->db->query($sql,$data);
        return $query->result_array();
    }
    public function voidProductPhoto($FileDateVoid,$FileId){
        $sql = "UPDATE t_document SET FileDateVoid = ? WHERE FileId = ?";
        $data = array($FileDateVoid,$FileId);
        $query = $this->db->query($sql,$data);

        return "ok";
    }

}