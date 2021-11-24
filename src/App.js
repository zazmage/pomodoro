import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Modal, Button, Container, Row, Col, Card } from "react-bootstrap";

function App() {
  const [timer, setTimer] = useState(25);
  const [pomodoro, setPomodoro] = useState(25);
  const [rest, setRest] = useState(5);
  const [active, setActive] = useState(false);
  const [descanso, setDescanso] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setSeconds(0);
    }
  }, [active]);

  useEffect(() => {
    if (active && timer > 0) {
      setTimer((timer) => timer - 1);
    }
    if (timer === 0 && descanso) {
      setTimer(pomodoro);
      setDescanso(false);
    }
    if (timer === 0 && !descanso) {
      setTimer(rest);
      setDescanso(true);
    }
  }, [active, seconds]);

  useEffect(() => {
    setTimer(pomodoro);
  }, [pomodoro]);

  const handleClick = ({ target }) => {
    switch (target.name) {
      case "increase-rest":
        setRest(rest + 1);
        break;
      case "decrease-rest":
        if (rest > 0) setRest(rest - 1);
        break;
      case "increase-pomodoro":
        setPomodoro(pomodoro + 1);
        break;
      case "decrease-pomodoro":
        if (timer > 0) setPomodoro(pomodoro - 1);
        break;
      case "start":
        setActive(true);
        break;
      case "stop":
        setActive(false);
        break;
      case "restart":
        setActive(false);
        setTimer(pomodoro);
        setDescanso(false);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Modal.Dialog size="lg">
        <Modal.Header>
          <Modal.Title>Pomodoro</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>Duración del descanso</Card.Title>
                    <Card.Text className="text-center">{rest}</Card.Text>
                    <Row>
                      <Col>
                        <div className="d-grid gap-2">
                          <Button
                            onClick={handleClick}
                            name="decrease-rest"
                            variant="primary"
                          >
                            Disminuir
                          </Button>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-grid gap-2">
                          <Button
                            onClick={handleClick}
                            name="increase-rest"
                            variant="primary"
                          >
                            Aumentar
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>Duración del pomodoro</Card.Title>
                    <Card.Text className="text-center">{pomodoro}</Card.Text>
                    <Row>
                      <Col>
                        <div className="d-grid gap-2">
                          <Button
                            onClick={handleClick}
                            name="decrease-pomodoro"
                            variant="primary"
                          >
                            Disminuir
                          </Button>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-grid gap-2">
                          <Button
                            onClick={handleClick}
                            name="increase-pomodoro"
                            variant="primary"
                          >
                            Aumentar
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Body className="text-center">
                    {descanso ? `Descanso: ${timer}` : `Pomodoro: ${timer}`}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClick} name="start" variant="primary">
            Iniciar
          </Button>
          <Button onClick={handleClick} name="stop" variant="danger">
            Detener
          </Button>
          <Button onClick={handleClick} name="restart" variant="warning">
            Reiniciar
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default App;
