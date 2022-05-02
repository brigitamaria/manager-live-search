import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JOB_LEVEL } from "../../../datasource/enums";
import InputAutocomplete from "../InputAutocomplete";

const MOCK_DATA = [
    {
      "id": "1",
      "firstName": "John",
      "lastName": "Doe",
      "name": "John Doe",
      "jobLevel": JOB_LEVEL.Manager,
      "email": "john.doe@kinetar.com"
    }, 
    {
      "id": "201",
      "firstName": "Derrick",
      "lastName": "Cummings",
      "name": "Derrick Cummings",
      "jobLevel": JOB_LEVEL.SeniorManager
    }
];


describe('InputAutocomplete component', () => {
    afterEach(cleanup);

    it('should render show dropdown on input focus', () => {
        render(<InputAutocomplete data={MOCK_DATA} />);
        const inputField = screen.getByRole("textbox");

        act(() => {
            inputField.focus();
        })

        expect(screen.getByRole("listbox").className).not.toContain('hide');
        expect(screen.getAllByRole("option").length).toBe(2);
    });

    it('should render filtered dropdown on input change and handle selection', () => {
        render(<InputAutocomplete data={MOCK_DATA} />);
        const inputField = screen.getByRole("textbox");
        fireEvent.change(inputField, {
            target: { value: 'John' }
        });

        expect(screen.getByRole("listbox").className).not.toContain('hide');
        expect(screen.getAllByRole("option").length).toBe(1);

        fireEvent.click(screen.getByRole("option"));

        expect((inputField as HTMLInputElement).value).toBe('John Doe');
    });

    it('should render no result when query does not match', () => {
        render(<InputAutocomplete data={MOCK_DATA} />);
        const inputField = screen.getByRole("textbox");
        fireEvent.change(inputField, {
            target: { value: 'Bri' }
        });

        expect(screen.getByRole("listbox").className).toContain('hide');
        expect(screen.getByText("Zero result match your query. Please try to change your query.")).toBeInTheDocument();
    });

    it('should handle arrow up/down, enter, and escape on input', () => {
        const scrollIntoViewMock = jest.fn();
        window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
        render(<InputAutocomplete data={MOCK_DATA} />);
        const inputField = screen.getByRole("textbox");

        act(() => {
            inputField.focus();
        })

        // ENTER WHEN NO ACTIVE OPTION
        fireEvent.keyDown(inputField, {
            key: 'Enter'
        });

        // ARROW DOWN > GO TO FIRST OPTION
        fireEvent.keyDown(inputField, {
            key: 'ArrowDown'
        });

        expect(screen.getAllByRole("option")[0].className).toContain('active');

        fireEvent.keyDown(inputField, {
            key: 'ArrowDown'
        });

        // ARROW DOWN > GO TO SECOND OPTION
        expect(screen.getAllByRole("option")[0].className).not.toContain('active');
        expect(screen.getAllByRole("option")[1].className).toContain('active');


        // ARROW DOWN > CURRENTLY ON LAST OPTION, SO GO TO FIRST OPTION
         fireEvent.keyDown(inputField, {
            key: 'ArrowDown'
        });

        expect(screen.getAllByRole("option")[0].className).toContain('active');
        expect(screen.getAllByRole("option")[1].className).not.toContain('active');

        // ARROW UP > CURRENTLY ON FIRST OPTION, SO GO TO LAST OPTION
        fireEvent.keyDown(inputField, {
            key: 'ArrowUp'
        });

        expect(screen.getAllByRole("option")[0].className).not.toContain('active');
        expect(screen.getAllByRole("option")[1].className).toContain('active');

        // ENTER > CURRENTLY ON LAST OPTION
        fireEvent.keyDown(inputField, {
            key: 'Enter'
        });

        expect((inputField as HTMLInputElement).value).toBe('Derrick Cummings');

        // FOCUS TO INPUT AGAIN TO TEST OTHER RANDOM KEY (i.e. Delete) AND ESCAPE
        act(() => {
            inputField.focus();
        })

        fireEvent.keyDown(inputField, {
            key: 'Delete'
        });

        fireEvent.keyDown(inputField, {
            key: 'Escape'
        });

        expect(screen.getByRole("listbox").className).toContain('hide');
    });

    it('should handle arrow up/down, enter, and escape on option', () => {
        render(<InputAutocomplete data={MOCK_DATA} />);
        const inputField = screen.getByRole("textbox");

        act(() => {
            inputField.focus();
        })

        // TAB > GO TO FIRST OPTION
        userEvent.tab();

        const firstOpt = screen.getAllByRole("option")[0];
        const secondOpt = screen.getAllByRole("option")[1];

        expect(firstOpt).toHaveFocus();

        // ARROW DOWN > GO TO SECOND OPTION
        fireEvent.keyDown(firstOpt, {
            key: 'ArrowDown'
        });

        expect(secondOpt).toHaveFocus();

        // ARROW DOWN > CURRENTLY ON LAST OPTION, SO GO TO FIRST OPTION
         fireEvent.keyDown(secondOpt, {
            key: 'ArrowDown'
        });

        expect(firstOpt).toHaveFocus();

        // ARROW UP > CURRENTLY ON FIRST OPTION, SO GO TO LAST OPTION
        fireEvent.keyDown(firstOpt, {
            key: 'ArrowUp'
        });

        expect(secondOpt).toHaveFocus();

        // ENTER > CURRENTLY ON LAST OPTION
        fireEvent.keyDown(secondOpt, {
            key: 'Enter'
        });

        expect((inputField as HTMLInputElement).value).toBe('Derrick Cummings');

        // FOCUS TO INPUT AGAIN TO TEST OTHER RANDOM KEY (i.e. Delete) AND ESCAPE
        act(() => {
            inputField.focus();
        })

        userEvent.tab();

        expect(secondOpt).toHaveFocus();

        fireEvent.keyDown(secondOpt, {
            key: 'Delete'
        });

        fireEvent.keyDown(secondOpt, {
            key: 'Escape'
        });

        expect(screen.getByRole("listbox").className).toContain('hide')
    });
});