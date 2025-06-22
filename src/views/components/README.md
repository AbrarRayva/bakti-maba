# EJS Components Documentation

This folder contains reusable EJS components for the Bakti Maba application.

## Components

### 1. Input Text Component (`input-text.ejs`)

A reusable input field component with label and icon.

**Usage:**
```ejs
<%- include('../components/input-text', {
    id: 'username',
    label: 'Username',
    placeholder: 'Enter username',
    icon: '@',
    type: 'text', // optional, defaults to 'text'
    required: true, // optional
    value: 'default-value' // optional
}) %>
```

**Parameters:**
- `id` (required): Input field ID and name
- `label` (required): Label text
- `placeholder` (required): Placeholder text
- `icon` (required): Icon character to display
- `type` (optional): Input type (text, password, email, etc.)
- `required` (optional): Whether the field is required
- `value` (optional): Default value

### 2. Button Component (`button.ejs`)

A reusable button component with consistent styling.

**Usage:**
```ejs
<%- include('../components/button', {
    text: 'Submit',
    type: 'submit', // optional, defaults to 'button'
    id: 'submit-btn', // optional
    onclick: 'handleSubmit()' // optional
}) %>
```

**Parameters:**
- `text` (required): Button text
- `type` (optional): Button type (button, submit, reset)
- `id` (optional): Button ID
- `onclick` (optional): Onclick handler

### 3. Form Card Component (`form-card.ejs`)

A card wrapper for forms with title and subtitle.

**Usage:**
```ejs
<%- include('../components/form-card', {
    title: 'Login',
    subtitle: 'Enter your credentials',
    content: `
        <!-- Your form content here -->
    `
}) %>
```

**Parameters:**
- `title` (optional): Card title
- `subtitle` (optional): Card subtitle
- `content` (optional): Card content (HTML)

### 4. Card Component (`card.ejs`)

A general-purpose card component for content display.

**Usage:**
```ejs
<%- include('../components/card', {
    title: 'Card Title',
    subtitle: 'Card subtitle',
    content: `
        <!-- Your content here -->
    `
}) %>
```

**Parameters:**
- `title` (optional): Card title
- `subtitle` (optional): Card subtitle
- `content` (optional): Card content (HTML)

## Layouts

Layouts are stored in the `../layouts/` folder:

### Main Layout (`../layouts/main.ejs`)

A complete page layout with HTML structure and styling.

**Usage:**
```ejs
<%- include('../layouts/main', {
    title: 'Page Title',
    extraHead: '<link rel="stylesheet" href="custom.css">', // optional
    body: `
        <!-- Your page content here -->
    `
}) %>
```

**Parameters:**
- `title` (optional): Page title
- `extraHead` (optional): Additional head content
- `body` (optional): Page body content

## Example: Login Page

Here's how to create a login page using these components:

```ejs
<%- include('../layouts/main', {
    title: 'Login - Bakti Maba',
    body: `
        <%- include('../components/form-card', {
            title: 'Login',
            subtitle: 'Masukkan username (NIM) dan password yang telah diberikan oleh panitia.',
            content: `
                <%- include('../components/input-text', {
                    id: 'username',
                    label: 'Username',
                    placeholder: '251152xxxx',
                    icon: '@',
                    required: true
                }) %>
                
                <%- include('../components/input-text', {
                    id: 'password',
                    label: 'Password',
                    placeholder: 'Password',
                    icon: '#',
                    type: 'password',
                    required: true
                }) %>
                
                <%- include('../components/button', {
                    text: 'Submit',
                    type: 'submit'
                }) %>
            `
        }) %>
    `
}) %>
```

## Styling

All components use Tailwind CSS classes and follow the design system:
- Primary color: Indigo
- Font: Inter
- Border radius: 2xl (16px)
- Consistent spacing and typography

## Best Practices

1. Always provide required parameters
2. Use semantic HTML attributes (id, name, type)
3. Include proper accessibility attributes
4. Test components in different screen sizes
5. Keep components focused and single-purpose 