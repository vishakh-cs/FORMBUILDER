// requirements 

Develop a Dynamic Form Builder using React.js and Tailwind CSS. The application should allow users to create dynamic form fields, manage them, validate inputs, and preview the generated form.

Each field should contain the following properties:

 Name – Label of the field
 Type – Text, Number, Email, Password, Date, Textarea, Select,Radio,Checkbox, file upload etc.
 Display Status – Active / Inactive
 Default Value – Optional
 Required – Yes / No
 Options – Optional for Select, Radio, Checkbox fields


 2. Edit & Delete

 3. Reorder Fields

Allow users to change the order of fields using either:


. Form Preview

Display a live preview of the generated form.

Requirements:

 Only Active fields should be displayed.
 Render each field according to its selected type.
 Required fields should display an asterisk ().


 5. Validation

Implement client-side validation with the following rules:

 Field Name is mandatory.
 Field Name must be unique.
 Field Type is mandatory.
 Default Value should match the selected field type.
 Required fields cannot be submitted empty.


 6. Form Submission

When the preview form is submitted:

 Validate all fields.
 Display the submitted form data in JSON format below the form.


 Bonus Features

 Drag-and-drop field ordering
 Local Storage persistence
 Configurable options for Select fields
 Responsive UI
 Dark Mode
 Search configured fields
 Reset Form Builder
