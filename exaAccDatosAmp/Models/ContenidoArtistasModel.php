<?php
class ContenidoArtistasModel {
    public function insertData($sql, $typeParameters, ...$params) {
        $mysqli = Conex1::con1();
        try {
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
            if ($stmt) $stmt->close();
            $mysqli->close();
        }
        return $result;
    }

    public function getData($sql, $typeParameters, ...$params) {
        $mysqli = Conex1::con1();
        $stmt = $mysqli->prepare($sql);
        if (!$stmt) {
            throw new Exception("Error en la preparación de la consulta: " . $mysqli->error);
        }
        $stmt->bind_param($typeParameters, ...$params);
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