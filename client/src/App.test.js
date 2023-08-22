import { render, screen,waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

describe("App", () => {

  it("Render Sprint board elements on screen", async() => {
     render(<App />);
     const heading = screen.getByText(/Sprint Board/i);
     expect(heading).toBeInTheDocument();
     const ticketDescription = screen.getByRole("textbox", { name: /ticket description/i });
     expect(ticketDescription).toBeInTheDocument();
     const assignee = screen.getByRole("textbox", { name: /assignee/i });
     expect(assignee).toBeInTheDocument();
     const addButton = screen.getByRole("button", { name: /add to board/i });
     expect(addButton).toBeInTheDocument;
  });

  it("User Interactions - Adding Ticket description and Assignee", async () => {
     render(<App />);
     const ticketDescription = screen.getByRole("textbox", { name: /ticket description/i });
     userEvent.type(ticketDescription, 'Create Login');
     const assignee = screen.getByRole("textbox", { name: /assignee/i });
     userEvent.type(assignee, 'Ankit');
     const addButton = screen.getByRole("button", { name: /add to board/i });
     expect(addButton).toBeInTheDocument;
  });
});
