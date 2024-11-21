<?php
require_once '../Db/Con1Db.php';

class InsercionModel
{
    public function insertData($sql, $typeParameters, ...$params)
    {
        try {
            $mysqli = Conex1::con1();
            $stmt = $mysqli->prepare($sql);
            if (!$stmt) {
                throw new Exception("Error en la preparación de la consulta: " . $mysqli->error);
            }
            $stmt->bind_param($typeParameters, ...$params);
            if (!$stmt->execute()) {
                throw new Exception("Error en la ejecución de la consulta: " . $stmt->error);
            }
            $result = ["status" => "success", "message" => "Operación realizada con éxito."];
        } catch (Exception $e) {
            $result = ["status" => "error", "message" => $e->getMessage()];
        } finally {
            if (isset($stmt)) $stmt->close();
            if (isset($mysqli)) $mysqli->close();
        }
        return $result;
    }

    public function getData($sql, $typeParameters, $param)
    {
        $mysqli = Conex1::con1();
        $param = $mysqli->real_escape_string($param);
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param($typeParameters, $param);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = [];
        if($result->num_rows >= 1) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        $result->free();
        $stmt->close();
        $mysqli->close();
        return $data;
    }
}
?>