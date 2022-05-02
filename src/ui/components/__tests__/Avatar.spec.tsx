import { render, screen } from "@testing-library/react";
import { JOB_LEVEL } from "../../../datasource/enums";
import Avatar from "../Avatar";

const MOCK_INITIALS = "TS";

describe('Avatar component', () => {
    it('should render correctly when no jobLevel provided', () => {
        render(<Avatar initials={MOCK_INITIALS} jobLevel={undefined} />);
        expect(screen.getByText(MOCK_INITIALS)).toBeTruthy();
    });

    it('should render correctly when jobLevel provided', () => {
        render(<Avatar initials={MOCK_INITIALS} jobLevel={JOB_LEVEL.Manager} />);
        expect(screen.getByRole('figure').className).toContain('avatar--manager');
    });
});