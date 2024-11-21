<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
    try {
        $title = $_POST['title'] ?? null;
        if (!$title) {
            throw new Exception("El título del contenido es obligatorio.");
        }
        require_once "../Models/InsercionModel.php";
        $obj1 = new InsercionModel();
        $sql1 = "INSERT INTO contenidos (tit_con) VALUES (?)";
        $typeParameters = "s";
        $data1 = $obj1->insertData($sql1, $typeParameters, $title);
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
    require_once '../Models/InsercionModel.php';    
    $obj1 = new InsercionModel();
    $sql1 = "SELECT ide_con, tit_con FROM contenidos WHERE tit_con LIKE ? ORDER BY tit_con";    
    $typeParameters = "s"; 
    $data1 = $obj1->getData($sql1, $typeParameters, $bus);
    header('Content-Type: application/json');
    echo json_encode($data1);
}
?>