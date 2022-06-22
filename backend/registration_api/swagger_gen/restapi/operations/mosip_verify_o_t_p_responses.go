// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"github.com/divoc/registration-api/swagger_gen/models"
)

// MosipVerifyOTPOKCode is the HTTP code returned for type MosipVerifyOTPOK
const MosipVerifyOTPOKCode int = 200

/*MosipVerifyOTPOK OK

swagger:response mosipVerifyOTPOK
*/
type MosipVerifyOTPOK struct {

	/*
	  In: Body
	*/
	Payload *MosipVerifyOTPOKBody `json:"body,omitempty"`
}

// NewMosipVerifyOTPOK creates MosipVerifyOTPOK with default headers values
func NewMosipVerifyOTPOK() *MosipVerifyOTPOK {

	return &MosipVerifyOTPOK{}
}

// WithPayload adds the payload to the mosip verify o t p o k response
func (o *MosipVerifyOTPOK) WithPayload(payload *MosipVerifyOTPOKBody) *MosipVerifyOTPOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the mosip verify o t p o k response
func (o *MosipVerifyOTPOK) SetPayload(payload *MosipVerifyOTPOKBody) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *MosipVerifyOTPOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// MosipVerifyOTPBadRequestCode is the HTTP code returned for type MosipVerifyOTPBadRequest
const MosipVerifyOTPBadRequestCode int = 400

/*MosipVerifyOTPBadRequest Bad request

swagger:response mosipVerifyOTPBadRequest
*/
type MosipVerifyOTPBadRequest struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewMosipVerifyOTPBadRequest creates MosipVerifyOTPBadRequest with default headers values
func NewMosipVerifyOTPBadRequest() *MosipVerifyOTPBadRequest {

	return &MosipVerifyOTPBadRequest{}
}

// WithPayload adds the payload to the mosip verify o t p bad request response
func (o *MosipVerifyOTPBadRequest) WithPayload(payload *models.Error) *MosipVerifyOTPBadRequest {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the mosip verify o t p bad request response
func (o *MosipVerifyOTPBadRequest) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *MosipVerifyOTPBadRequest) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(400)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// MosipVerifyOTPUnauthorizedCode is the HTTP code returned for type MosipVerifyOTPUnauthorized
const MosipVerifyOTPUnauthorizedCode int = 401

/*MosipVerifyOTPUnauthorized Invalid OTP

swagger:response mosipVerifyOTPUnauthorized
*/
type MosipVerifyOTPUnauthorized struct {
}

// NewMosipVerifyOTPUnauthorized creates MosipVerifyOTPUnauthorized with default headers values
func NewMosipVerifyOTPUnauthorized() *MosipVerifyOTPUnauthorized {

	return &MosipVerifyOTPUnauthorized{}
}

// WriteResponse to the client
func (o *MosipVerifyOTPUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(401)
}

// MosipVerifyOTPInternalServerErrorCode is the HTTP code returned for type MosipVerifyOTPInternalServerError
const MosipVerifyOTPInternalServerErrorCode int = 500

/*MosipVerifyOTPInternalServerError Internal Error

swagger:response mosipVerifyOTPInternalServerError
*/
type MosipVerifyOTPInternalServerError struct {

	/*
	  In: Body
	*/
	Payload interface{} `json:"body,omitempty"`
}

// NewMosipVerifyOTPInternalServerError creates MosipVerifyOTPInternalServerError with default headers values
func NewMosipVerifyOTPInternalServerError() *MosipVerifyOTPInternalServerError {

	return &MosipVerifyOTPInternalServerError{}
}

// WithPayload adds the payload to the mosip verify o t p internal server error response
func (o *MosipVerifyOTPInternalServerError) WithPayload(payload interface{}) *MosipVerifyOTPInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the mosip verify o t p internal server error response
func (o *MosipVerifyOTPInternalServerError) SetPayload(payload interface{}) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *MosipVerifyOTPInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	payload := o.Payload
	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}
