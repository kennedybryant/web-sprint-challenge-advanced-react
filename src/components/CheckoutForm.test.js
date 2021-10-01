import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm/>);
});

test("shows success message on submit with form details", async() => {
    render(<CheckoutForm/>);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const addressInput = screen.getByLabelText(/address/i);
    const cityInput = screen.getByLabelText(/city/i);
    const stateInput = screen.getByLabelText(/state/i);
    const zipcodeInput = screen.getByLabelText(/zip/i);

    userEvent.type(firstNameInput, "Kennedy");
    userEvent.type(lastNameInput, "Bryant");
    userEvent.type(addressInput, "123 Address St.");
    userEvent.type(cityInput, "Somewhere");
    userEvent.type(stateInput, "Georgia");
    userEvent.type(zipcodeInput, "12345");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    await waitFor (() => {
      const successMessage = screen.queryByTestId("successMessage");
      expect(successMessage).toBeInTheDocument();
    })
   
});
