export interface NotificationStateInterface {
    msg: any,
    type: 'error' | 'info' | 'success' | 'warning',
    error: boolean,
    success: boolean
}
