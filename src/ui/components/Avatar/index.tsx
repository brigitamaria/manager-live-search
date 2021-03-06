import { JOB_LEVEL } from '../../../datasource/enums';

import './avatar.scss';

type AvatarProps = {
    initials: string
    jobLevel: JOB_LEVEL | undefined
}

const jobLevelClassName = {
    "Manager": "manager",
    "Executive": "executive",
    "Senior Manager": "senior-manager"
};

const Avatar = ({
    initials,
    jobLevel
}: AvatarProps) => {
    return (
        <figure className={`avatar ${jobLevel ? `avatar--${jobLevelClassName[jobLevel]}` : ''}`}>
            <figcaption>{initials.toUpperCase()}</figcaption>
        </figure>
    )
}

export default Avatar;