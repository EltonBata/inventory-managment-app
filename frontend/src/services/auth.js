export const authenticate = async (credentials) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "pt",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Request error!");
    }

    throw error;
  }
};

export const register = async (body_data) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body_data),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Request error!");
    }

    throw error;
  }
};

export const verifyEmail = async ({ id, hash, token }) => {
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/auth/verify/${id}/${hash}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "pt",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Request error!");
    }

    throw error;
  }
};

export const resendEmailVerification = async ({ token }) => {
  try {
    const res = await fetch(
      "http://127.0.0.1:8000/api/auth/resend-verification-email",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Accept-Language": "pt",
        },
      }
    );

    const data = res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Request error!");
    }

    throw error;
  }
};

export const logoutRequest = async ({ token }) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Request error! Failed to loggout!");
    }

    throw error;
  }
};

export const refreshToken = (token_expiration, setToken) => {
  const expiration = new Date(token_expiration);
  const newExpiration = new Date(expiration.getTime() + 30 * 60000); // +30min

  setToken((prev) => ({
    ...prev,
    token_expires_at: newExpiration.toISOString(),
  }));
};
