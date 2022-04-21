import React from 'react'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'

const ShowModalSingleAction = ({ show, title, body, positiveButton, negativeButton, handler }) => {
    return (
        <div>
            <Modal show={show} onHide={handler}>
                {
                    title &&
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                }
                <Modal.Body>{body}</Modal.Body>
                {
                    negativeButton &&
                    <Modal.Footer>
                        <Button className='btn btn-outline-info form-control' onClick={handler}>
                            {negativeButton}
                        </Button>
                    </Modal.Footer>
                }
                {
                    positiveButton &&
                    <Modal.Footer>
                        <Button className='btn btn-outline-info form-control' onClick={handler}>
                            {positiveButton}
                        </Button>
                    </Modal.Footer>
                }
            </Modal>
        </div>
    )
}

export default ShowModalSingleAction