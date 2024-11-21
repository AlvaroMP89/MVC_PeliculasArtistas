<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        require_once '../Db/Con1Db.php';
        require_once '../Models/ContenidoArtistasModel.php';
        $obj1 = new ContenidoArtistasModel();
        $artist_id = $_POST['artist_id'];
        $content_id = $_POST['content_id'];
        $sql1 = "INSERT INTO artistas_contenidos (ide_art, ide_con) VALUES (?, ?)";
        $typeParameters = "ii";
        $data1 = $obj1->insertData($sql1, $typeParameters, $artist_id, $content_id);
        echo json_encode($data1);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    $bus = empty($_POST['textoConsulta1']) ? '' : $_POST['textoConsulta1'];
    $bus = "%" . $bus . "%";
    require_once '../Db/Con1Db.php';
    require_once '../Models/ContenidoArtistasModel.php';
    $obj1 = new ContenidoArtistasModel();
    $sql1 = "SELECT a.non_art, c.tit_con FROM artistas_contenidos ac
             JOIN artistas a ON ac.ide_art = a.ide_art
             JOIN contenidos c ON ac.ide_con = c.ide_con
             WHERE a.non_art LIKE ? OR c.tit_con LIKE ?
             ORDER BY c.tit_con, a.non_art";
    $typeParameters = "ss";
    $data1 = $obj1->getData($sql1, $typeParameters, $bus, $bus);
    header('Content-Type: application/json');
    echo json_encode($data1);
}
?>