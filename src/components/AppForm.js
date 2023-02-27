import React from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AppForm() {
  return (
    <Form className='form-main'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <div className='form-inline-div'>
            <div>
                <Form.Label className='label-dark'>First name</Form.Label>
                <Form.Control type="email" placeholder="Enter first name" />
            </div>
            <div>
                <Form.Label className='label-dark'>Last name</Form.Label>
                <Form.Control type="email" placeholder="Enter last name" />
            </div>
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <div className='form-inline-div'>
            <div>
                <Form.Label className='label-dark'>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </div>
            <div>
                <Form.Label className='label-dark'>Phone</Form.Label>
                <Form.Control type="email" placeholder="Enter phone number" />
            </div>
        </div>
      </Form.Group>

      <div>
        <p className='modal-para'>
            Card details
            <span className='staric'>*</span>
        </p>
      </div>

      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <Form.Label className='label-light'>Card holder name</Form.Label>
                <Form.Control type="email" placeholder="Jogh Smith" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='label-light'>Credit card number</Form.Label>
                <Form.Control type="email" placeholder="0000 0000 0000 0000" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <div className='form-inline-div'>
            <div>
                <Form.Label className='label-light'>Expiration date</Form.Label>
                <Form.Control type="email" placeholder="MM/YY" />
            </div>
            <div>
                <Form.Label className='label-light'>CVC</Form.Label>
                <Form.Control type="email" placeholder="000" />
            </div>
        </div>
      </Form.Group>

      <Form.Group className="mb-4 mt-3" controlId="formBasicEmail">
            <Form.Label className='label-light'>Promo code</Form.Label>
            <Form.Control type="email" placeholder="Enter your Promo code" />
      </Form.Group>

        <div className='mt-4'>
            <button className='main-btn'>
                Book appointment
            </button>
            <button className='outline-btn mt-2'>
                Cancel
            </button>
        </div>
    </Form>
  );
}
