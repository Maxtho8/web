
<?php 
//////////////////////////
//                      //
//       FTP_EASY       //
//                      //
//////////////////////////

class ftp
{
    public static $ftp_host='35.163.228.146';//host
    private static $user='dlpuser';//user
    private static $password='rNrKYTX9g7z3RgJRmxWuGHbeu';//password
    const ENABLE_LINK = true;// to enable the link in ftp_list
    public static $ftp;
    
    public function connect()
    {
        
        $ftp = ftp_connect(self::$ftp_host,'21') or exit('Connexion with the server impossible');
        self::$ftp = $ftp;
        $this->login();
    }
    private function login()
    {
        ftp_login(self::$ftp,self::$user,self::$password)or exit('Password or user incorrect');
    }
    public function file_list()
    {
       $list =  ftp_nlist(self::$ftp,'.');
       foreach ($list as $element)
       {   
         if(self::ENABLE_LINK == true)
         {
            $pwd = ftp_pwd(self::$ftp);
            if($extension = pathinfo($element,PATHINFO_EXTENSION) != null )
            {echo '<a href="?go_to='.$pwd.'/'.$element.'"><div style="display:flex;align-items:center"><img src="icon/fichier.png"> '.$element.'</div><br></a>';}
            else{echo '<a href="?go_to='.$pwd.'/'.$element.'"><div style="display:flex;align-items:center"><img src="icon/dossier.png"> '.$element.'</div><br></a>';}
         }
         elseif(self::ENABLE_LINK == false)
         {
            $pwd = ftp_pwd(self::$ftp);
            if($extension = pathinfo($element,PATHINFO_EXTENSION) != null )
            {echo '<div style="display:flex;align-items:center"><img src="icon/fichier.png"> '.$element.'</div><br>';}
            else{echo '<div style="display:flex;align-items:center"><img src="icon/dossier.png"> '.$element.'</div><br>';} 
         }
           
       }   
    }
    public function go_to($file)
    {
        if ($element)
        ftp_chdir(self::$ftp,$file)
        or exit('Déplacement impossible, vérifier que le que dossier existe.');
    }
    public function chmod($file, $chmod)
    {
        ftp_chmod(ftp::$ftp, $chmod, $file)
        or exit('Impossible d\'effectué l\'action');
    }
    public function upload($ftp,$client)
    {
        ftp_put(self::$ftp, $ftp, $client, FTP_BINARY)
        or exit('Upload impossible verifiez bien que le fichier à importer existe et que le répertoire de réception soit correct');
    }
    public function download($ftp,$client)
    {
        ftp_get(self::$ftp, $client, $ftp, FTP_BINARY)
        or exit('Download impossible verifiez bien que le fichier à download existe et que le répertoire de réception soit correct');
    }
    public function delete($file)
    {
        ftp_delete(self::$ftp,$file)
        or exit('Fichier à supprimer introuvable');
    }
}

$ftp = new ftp;
$ftp->connect();
if (isset($_GET['go_to']) AND ftp::ENABLE_LINK == true)
{
   $ftp->go_to($_GET['go_to']);
}
$ftp->file_list();

?>

