from django.http import HttpResponse
from .models import Student

def list_view(request):
    students = Student.objects.all()
    html = "<h1>Students</h1><ul>"
    for s in students:
        html += f"<li>{s.name} — GPA:{s.gpa}</li>"
    html += "</ul>"
    return HttpResponse(html)

def detail_view(request, pk):
    student = Student.objects.get(pk=pk)
    return HttpResponse(f"<h1>{student.name}</h1><p>GPA:{student.gpa}</p>")

