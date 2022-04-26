import React, { useRef } from 'react'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'

const ShowModalSingleAction = ({ show, title, body, buttonText, handler }) => {
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
                    buttonText &&
                    <Modal.Footer>
                        <Button className='btn btn-outline-info form-control' onClick={handler}>
                            {buttonText}
                        </Button>
                    </Modal.Footer>
                }
            </Modal>
        </div>
    )
}

export default ShowModalSingleAction