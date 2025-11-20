import { fireEvent, render, screen } from "@testing-library/react";
import ModalContainer from ".";

describe("Modal Component", () => {
  test("Does not render when open = false", () => {
    render(
      <ModalContainer open={false} handleClose={jest.fn()}>
        <div>Content</div>
      </ModalContainer>
    );
    const modal = screen.queryByText("Content");

    expect(modal).not.toBeInTheDocument();
  });

  test("Render modal when open = true", () => {
    render(
      <ModalContainer open={true} handleClose={jest.fn()}>
        <div>Content</div>
      </ModalContainer>
    );
    const modal = screen.getByText("Content");

    expect(modal).toBeInTheDocument();
  });

  test("Calls handleClose when clicking on backdrop", () => {
    const handelClose = jest.fn();

    render(
      <ModalContainer open={true} handleClose={handelClose}>
        <div>Content</div>
      </ModalContainer>
    );

    const backdrop = screen.getByTestId("modal-backdrop");

    fireEvent.click(backdrop);

    expect(handelClose).toHaveBeenCalledTimes(1);
  });

  test("Does NOT close when clicking inside modal content", () => {
    const handelClose = jest.fn();

    render(
      <ModalContainer open={true} handleClose={handelClose}>
        <div data-testid="modal-content">Content</div>
      </ModalContainer>
    );

    const content = screen.getByTestId("modal-content");

    fireEvent.click(content);

    expect(handelClose).not.toHaveBeenCalled();
  });

  test("Calls handleClose when clicking close button", () => {
    const handelClose = jest.fn();

    render(
      <ModalContainer open={true} handleClose={handelClose}>
        <div>Content</div>
      </ModalContainer>
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(handelClose).toHaveBeenCalledTimes(1);
  });
});
