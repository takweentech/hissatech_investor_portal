import { inject } from '@angular/core';

import { TokenService } from '../services/token.service';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const tokenService = inject(TokenService);

    const token = tokenService.getToken();
    if (token) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
            // headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWU3MmJjNi0yYTFjLTQ5YTgtYjUzMy0wNTUzNmEwNTNlNjIiLCJzdWIiOiI1MTIzNDU2NzciLCJVc2VySWQiOiI5MzlhZDEwMC1iZGQ0LTQxMDktODcwZi1kNWM1OTZhNDUzZDciLCJFbWFpbCI6InkuYWxhYUB0YWt3ZWVudGVjaC5zYSIsIlJvbGUiOiJJbnZlc3RvciIsIk1vYmlsZU51bWJlciI6IjUxMjM0NTY3NyIsImV4cCI6MTc2MjM0NTQwNCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEifQ.pnXY63zIDSHCPSqtDe5IeNB5Cr20uOhIuED3kvvUInk`)
        });
        return next(cloned);
    }
    return next(req);
}


