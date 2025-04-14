export interface IResponseAttendance {
    id: number;
    user_id: number;
    user: {
        name: string;
    };
    login_time: string;
    logout_time: string;
    branch_id: number;
    branch: {
        branch_name: string;
    };
    is_late: boolean;
    is_minutes: boolean;
}


export interface IRequestAttendance {
    id: number;
    user_id: number;
    user: {
        name: string;
    };
    login_time: string;
    logout_time: string;
    branch_id: number;
    branch: {
        branch_name: string;
    };
    is_late: boolean;
    is_minutes: boolean;
}