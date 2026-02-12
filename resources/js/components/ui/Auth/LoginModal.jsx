import { useState } from 'react'
import { router } from '@inertiajs/react'

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  if (!isOpen) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedPassword = password.trim()

    if (normalizedEmail === 'admin@lakeview.ph' && normalizedPassword === 'admin123') {
      router.visit('/admin/dashboard')
      return
    }

    if (normalizedEmail === 'org@lakeview.ph' && normalizedPassword === 'org123') {
      router.visit('/org/dashboard')
      return
    }

    if (normalizedEmail === 'cont@lakeview.ph' && normalizedPassword === 'cont123') {
      router.visit('/contributor/dashboard')
      return
    }

    setErrorMessage('Invalid email or password.')
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      setErrorMessage('')
      onClose()
    }
  }

  const handleClose = () => {
    setErrorMessage('')
    onClose()
  }

  return (
    <div
      className="auth-login-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3 p-md-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={handleBackdropClick}
    >
      <div className="auth-login-modal card border-0 shadow-lg text-white w-100">
        <div className="card-body p-4 p-md-5">
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <div className="d-flex align-items-center gap-2 fw-semibold mb-4">
                <i className="bi bi-geo-alt-fill text-info" aria-hidden="true" />
                <span>LakeView PH</span>
              </div>
              <h2 className="display-6 fw-bold mb-2">Welcome Back</h2>
              <p className="text-light-emphasis mb-0">Log in to continue to LakeView PH</p>
            </div>

            <button type="button" className="btn btn-outline-light auth-login-close" aria-label="Close" onClick={handleClose}>
              <i className="bi bi-x-lg" aria-hidden="true" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control auth-login-input"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <span className="input-group-text auth-login-input-icon">
                  <i className="bi bi-at" aria-hidden="true" />
                </span>
              </div>
            </div>

            <div className="mb-3">
              <div className="input-group">
                <input
                  type="password"
                  className="form-control auth-login-input"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <span className="input-group-text auth-login-input-icon">
                  <i className="bi bi-eye" aria-hidden="true" />
                </span>
              </div>
            </div>

            {errorMessage ? <div className="text-danger small mb-3">{errorMessage}</div> : null}

            <div className="form-check d-flex justify-content-end align-items-center gap-2 mb-4">
              <label className="form-check-label text-light-emphasis" htmlFor="auth-remember-me">
                Remember me
              </label>
              <input className="form-check-input m-0" type="checkbox" id="auth-remember-me" />
            </div>

            <button type="submit" className="btn auth-login-submit w-100 fw-bold py-2 mb-3">
              LOG IN
            </button>

            <a href="#" className="d-inline-block fw-semibold text-info text-decoration-none mb-4">
              Forgot your password?
            </a>

            <p className="mb-0 text-light-emphasis">
              Don’t have an account?{' '}
              <a href="#" className="fw-semibold text-info text-decoration-none">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
