export const shareContent = async (title, url) => {
  try {
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      // Fallback behavior for devices that do not support Web Share API
      
    }
  } catch (error) {
    console.error('Error sharing:', error);
  }

  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    // Create a temporary textarea element
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = `${url}`;

    // Append the textarea to the document
    document.body.appendChild(tempTextArea);

    // Select the textarea content
    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999); // For mobile devices

    // Execute the copy command
    document.execCommand("copy");

    // Remove the temporary textarea
    document.body.removeChild(tempTextArea);

    // Show a message to the user indicating the content has been copied
    const shareMessage = "Article link copied! You can now share it manually.";
    alert(shareMessage);
  } else {
    // Provide a fallback behavior for non-iOS devices
    
  }
};
