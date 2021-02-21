// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// EnrollRecipientHandlerFunc turns a function with the right signature into a enroll recipient handler
type EnrollRecipientHandlerFunc func(EnrollRecipientParams) middleware.Responder

// Handle executing the request and returning a response
func (fn EnrollRecipientHandlerFunc) Handle(params EnrollRecipientParams) middleware.Responder {
	return fn(params)
}

// EnrollRecipientHandler interface for that can handle valid enroll recipient params
type EnrollRecipientHandler interface {
	Handle(EnrollRecipientParams) middleware.Responder
}

// NewEnrollRecipient creates a new http.Handler for the enroll recipient operation
func NewEnrollRecipient(ctx *middleware.Context, handler EnrollRecipientHandler) *EnrollRecipient {
	return &EnrollRecipient{Context: ctx, Handler: handler}
}

/*EnrollRecipient swagger:route POST /recipients enrollRecipient

Enroll Recipient

*/
type EnrollRecipient struct {
	Context *middleware.Context
	Handler EnrollRecipientHandler
}

func (o *EnrollRecipient) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		r = rCtx
	}
	var Params = NewEnrollRecipientParams()

	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request

	o.Context.Respond(rw, r, route.Produces, route, res)

}