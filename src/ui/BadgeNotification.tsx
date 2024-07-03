'use client';

export const BadgeNotification = ({
    totalNotifications = 0,
}: {
    totalNotifications: number;
}) => {
    return (
        <span className="badge badge-primary-content badge-sm indicator-item sm:badge-primary">
            {totalNotifications}
        </span>
    );
};
