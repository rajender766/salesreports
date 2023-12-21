import Swal from 'sweetalert2';

export const handleApiError = (error) => {
  if (error.response?.status === 401) {
    if (error.response?.status === 401) {
      // Redirect to the login page
      window.location.href = '/login';
      return;
    }
  }

  return Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Oops Something went wrong !',
    showCloseButton: true,
    confirmButtonText: 'OK',
  });
};
