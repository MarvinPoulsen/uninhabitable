import os

def postbuild():
    try:
        file_path = os.path.join(os.path.dirname(__file__), '../dist/index.html')
        with open(file_path, 'r') as file:
            file_content = file.read()
        file_content = file_content.replace('http://localhost:8080/', '/')
        with open(file_path, 'w') as file:
            file.write(file_content)
        print('File updated successfully')
    except Exception as e:
        print('An error occurred:', e)

postbuild()