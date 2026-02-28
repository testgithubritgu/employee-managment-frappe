import frappe

@frappe.whitelist()
def update_todo(todo_name, status=None ,title=None ,time=None):
    doc = frappe.get_doc("To Do",todo_name)

    if status:
        doc.status = status
        
    if title:
        doc.title = title
    if time:
        doc.time = time
    doc.save()
    frappe.db.commit()

    return doc