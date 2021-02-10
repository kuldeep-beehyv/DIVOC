// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"
)

// UpdateProgramOKCode is the HTTP code returned for type UpdateProgramOK
const UpdateProgramOKCode int = 200

/*UpdateProgramOK OK

swagger:response updateProgramOK
*/
type UpdateProgramOK struct {
}

// NewUpdateProgramOK creates UpdateProgramOK with default headers values
func NewUpdateProgramOK() *UpdateProgramOK {

	return &UpdateProgramOK{}
}

// WriteResponse to the client
func (o *UpdateProgramOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(200)
}

// UpdateProgramBadRequestCode is the HTTP code returned for type UpdateProgramBadRequest
const UpdateProgramBadRequestCode int = 400

/*UpdateProgramBadRequest Invalid input

swagger:response updateProgramBadRequest
*/
type UpdateProgramBadRequest struct {
}

// NewUpdateProgramBadRequest creates UpdateProgramBadRequest with default headers values
func NewUpdateProgramBadRequest() *UpdateProgramBadRequest {

	return &UpdateProgramBadRequest{}
}

// WriteResponse to the client
func (o *UpdateProgramBadRequest) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(400)
}

// UpdateProgramUnauthorizedCode is the HTTP code returned for type UpdateProgramUnauthorized
const UpdateProgramUnauthorizedCode int = 401

/*UpdateProgramUnauthorized Unauthorized

swagger:response updateProgramUnauthorized
*/
type UpdateProgramUnauthorized struct {
}

// NewUpdateProgramUnauthorized creates UpdateProgramUnauthorized with default headers values
func NewUpdateProgramUnauthorized() *UpdateProgramUnauthorized {

	return &UpdateProgramUnauthorized{}
}

// WriteResponse to the client
func (o *UpdateProgramUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(401)
}