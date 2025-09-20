# backend/tests/test_api.py
from copy import deepcopy
from fastapi.testclient import TestClient
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))
from main import app, _movimientos

client = TestClient(app)

SEED = [
    {"tipo": "ingreso", "monto": 1200.0, "descripcion": "Salario", "categoria": "Trabajo"},
    {"tipo": "gasto", "monto": 150.0, "descripcion": "Transporte", "categoria": "Movilidad"},
    {"tipo": "gasto", "monto": 230.0, "descripcion": "Mercado", "categoria": "Hogar"},
]

def reset_state():
    _movimientos.clear()
    _movimientos.extend(deepcopy(SEED))

def test_salud_ok():
    reset_state()
    r = client.get("/salud")
    assert r.status_code == 200
    assert r.json() == {"status": "ok"}

def test_listar_movimientos_devuelve_semilla():
    reset_state()
    r = client.get("/movimientos")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 3
    assert data[0]["tipo"] == "ingreso"

def test_crear_movimiento_valido():
    reset_state()
    nuevo = {"tipo": "ingreso", "monto": 100.5, "descripcion": "Freelance", "categoria": "Trabajo"}
    r = client.post("/movimientos", json=nuevo)
    assert r.status_code == 201

    r2 = client.get("/movimientos")
    assert len(r2.json()) == 4

def test_crear_movimiento_invalido_monto():
    reset_state()
    invalido = {"tipo": "gasto", "monto": 0, "descripcion": "X", "categoria": "Y"}
    r = client.post("/movimientos", json=invalido)

    assert r.status_code == 422

def test_eliminar_movimiento_ok():
    reset_state()

    r = client.delete("/movimientos/1")
    assert r.status_code == 204

    r2 = client.get("/movimientos")
    assert len(r2.json()) == 2

def test_eliminar_movimiento_fuera_de_rango():
    reset_state()
    r = client.delete("/movimientos/99")
    assert r.status_code == 404
    assert r.json()["detail"] == "Movimiento no encontrado"

def test_resumen_consistente_con_semilla():
    reset_state()
    r = client.get("/resumen")
    assert r.status_code == 200
    data = r.json()

    assert data["ingresos"] == 1200.0
    assert data["gastos"] == 380.0
    assert data["balance"] == 820.0
    assert data["total_movimientos"] == 3

    assert data["gastos_por_categoria"]["Movilidad"] == 150.0
    assert data["gastos_por_categoria"]["Hogar"] == 230.0
