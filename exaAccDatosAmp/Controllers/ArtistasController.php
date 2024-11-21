<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
    try {
        $name = $_POST['name'] ?? null;
        if (!$name) {
            throw new Exception("El nombre del artista es obligatorio.");
        }
        require_once "../Models/ArtistasModel.php";
        $obj1 = new ArtistasModel();
        $sql1 = "INSERT INTO artistas (non_art) VALUES (?)";
        $typeParameters = "s";
        $data1 = $obj1->insertData($sql1, $typeParameters, $name);
        echo json_encode($data1);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}
else
{
    $bus = empty($_POST['textoConsulta1']) ? '' : $_POST['textoConsulta1'];
    $bus = "%" . $bus . "%";
    require_once '../Db/Con1Db.php';
    require_once '../Models/ArtistasModel.php';    
    $obj1 = new ArtistasModel();
    $sql1 = "SELECT ide_art, non_art FROM artistas WHERE non_art LIKE ? ORDER BY non_art";    
    $typeParameters = "s"; 
    $data1 = $obj1->getData($sql1, $typeParameters, $bus);
    header('Content-Type: application/json');
    echo json_encode($data1);
}
?>