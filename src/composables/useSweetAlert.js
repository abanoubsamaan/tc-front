import swal from 'sweetalert'

export default function useSweetAlert() {
  function flash(title, text, icon) {
    return swal(title, text, icon)
  }

  function confirmAction(message, callback) {
    swal({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true
    }).then((result) => {
      if (result) {
        callback()
      }
    })
  }

  return { flash, confirmAction }
}
