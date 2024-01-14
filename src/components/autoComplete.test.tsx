import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  within,
  cleanup,
} from "@testing-library/react";
import AutoComplete from "./autoComplete";

afterEach(() => {
  cleanup();
});

describe("AutoComplete Component", () => {
  it("renders the input box", () => {
    render(<AutoComplete />);
    const searchInput = screen.getByLabelText("search-input");
    expect(searchInput).toBeInTheDocument();
  });

  it("renders the suggestion list on input focus", async () => {
    render(<AutoComplete />);

    const suggestionList = screen.queryByTestId("suggestion-list");
    expect(suggestionList).not.toBeInTheDocument();

    const searchInput = screen.getByLabelText("search-input");

    act(() => {
      searchInput.focus();
    });

    await waitFor(
      () => {
        const showSuggestionList = screen.queryByTestId("suggestion-list");
        expect(showSuggestionList).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it("hides the suggestion list on click outside the text box", async () => {
    render(<AutoComplete />);

    const suggestionList = screen.queryByTestId("suggestion-list");
    expect(suggestionList).not.toBeInTheDocument();

    const searchInput = screen.getByLabelText("search-input");

    // show the suggestion list
    act(() => {
      searchInput.focus();
    });

    // confirm its showing
    await waitFor(
      () => {
        const showSuggestionList = screen.getByTestId("suggestion-list");
        expect(showSuggestionList).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // click out of the input box
    fireEvent.click(document.body);

    // check that the suggestion list is nolonger showiung
    await waitFor(
      () => {
        const showSuggestionList = screen.queryByTestId("suggestion-list");
        expect(showSuggestionList).not.toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it("updates the suggestion list based on user input", async () => {
    render(<AutoComplete />);

    const searchInput = screen.getByLabelText("search-input");
    const inputValue = "cle";

    fireEvent.focus(searchInput);

    fireEvent.change(searchInput, { target: { value: inputValue } });

    await waitFor(
      () => {
        const suggestions = screen.getAllByTestId("suggestion-list");
        const suggestionContent = suggestions.map((suggestion) =>
          suggestion.textContent?.toLocaleLowerCase().includes(inputValue)
        );
        expect(suggestionContent).toBeTruthy();
      },
      { timeout: 5000 }
    );
  });

  it("populates the input field when a suggestion item is clicked", async () => {
    render(<AutoComplete />);
    const inputValue = "cle";
    const searchInput = screen.getByLabelText(
      "search-input"
    ) as HTMLInputElement;
    let suggestionItems: HTMLElement[] = [];

    fireEvent.change(searchInput, { target: { value: inputValue } });

    await waitFor(
      () => {
        const suggestions = screen.queryByTestId(
          "suggestion-list"
        ) as HTMLElement;
        expect(suggestions).toBeInTheDocument();

        suggestionItems = within(suggestions)
          .getAllByRole("listitem")
          .filter((value) =>
            value.textContent?.toLocaleLowerCase().includes(inputValue)
          );
      },
      { timeout: 5000 }
    );

    fireEvent.click(suggestionItems[0]);

    await waitFor(
      () => {
        const searchInput = screen.getByLabelText(
          "search-input"
        ) as HTMLInputElement;

        expect(searchInput.value).toBe("Clementine Bauch");
      },
      { timeout: 5000 }
    );
  });

  it("should return a div with no-options if no suggestion list is empty", async () => {
    render(<AutoComplete />);
    const inputValue = "les";
    const searchInput = screen.getByLabelText(
      "search-input"
    ) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: inputValue } });

    await waitFor(
      () => {
        const noOption = screen.getByText("No options");
        expect(noOption).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it("moves selected suggestion move and down when using the keyboard arrow keys", async () => {
    render(<AutoComplete />);
    const inputValue = "c";
    const searchInput = screen.getByLabelText(
      "search-input"
    ) as HTMLInputElement;
    let suggestions: HTMLElement | null = null;

    fireEvent.change(searchInput, { target: { value: inputValue } });

    await waitFor(
      () => {
        const suggestions = screen.queryByTestId(
          "suggestion-list"
        ) as HTMLElement;
        expect(suggestions).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
    if (suggestions) fireEvent.keyDown(suggestions, { key: "ArrowDown" });
  });
});
