# UI Builder with Contentstack Integration

This repository contains the implementation of a dynamic **UI Builder** using **Contentstack**. The builder enables users to design and manage page layouts by generating and updating UI JSON for each page in Contentstack's visuals content type.

## Features

- **Interactive UI Builder**: Drag-and-drop functionality for creating and managing page layouts.
- **Page-Specific Content Types**: Manage page-specific content (e.g., Home, About Us, Blog) via Contentstack content types.
- **Dynamic UI JSON Generation**: Automatically generates UI JSON as users design the page layout in the builder.
- **UI JSON Management**: Easily create new entries or update existing entries in Contentstack for each page's layout.
- **Publishing to Environments**: After saving, UI JSON entries are automatically published to the selected environment.

## Workflow

1. **Initial Load**: 
    - The builder starts with a blank canvas.
    - The user selects a page-specific content type (Home, About Us, Blog, etc.).
  
2. **Check for Existing UI JSON**:
    - The builder checks if the selected page already has a UI JSON entry in the visuals content type.
    - If an entry exists, it is loaded and displayed on the canvas as editable components.
    - If no entry is found, a blank canvas is loaded.

3. **Creating New UI JSON**:
    - The user designs the page by dragging and dropping pre-created components onto the canvas.
    - Once the layout is complete, the user saves the UI JSON.
    - The builder creates a new entry in the visuals content type and publishes it to the specified environment.

4. **Updating Existing UI JSON**:
    - When updating an existing page, the user can modify the layout using the builder.
    - Instead of creating a new entry, the system updates the existing UI JSON.
    - The updated entry is then published to the environment.

## How It Works

1. **Blank Canvas**: Initially, the builder loads with a blank canvas.
2. **Content Type Selection**: The user selects the content type for the page they want to design.
3. **Check for UI JSON**: The system checks if there is any existing UI JSON for the selected page:
   - If UI JSON is found, it is loaded into the canvas.
   - If no UI JSON is found, the user starts with a blank canvas.
4. **Saving the Layout**: 
   - When saving, the system checks if an entry already exists for the page:
     - If no entry exists, a new entry is created and published.
     - If an entry exists, the existing UI JSON is updated and published.

## Technologies Used

- **React**: For building the frontend UI of the builder.
- **Contentstack**: Headless CMS to manage content and store UI JSON data.
- **@dnd-kit/core**: For implementing drag-and-drop functionality.
- **Tailwind CSS**: For styling the UI components.
- **Redux Toolkit**: For state management within the builder.

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/atharv2608/ui-builder.git
    ```

2. Navigate to the project directory:

    ```bash
    cd ui-builder
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```
4. Set up your **Contentstack** environment and api keys and link it with the application for managing content.

5. Run the application:

    ```bash
    npm run dev
    ```




