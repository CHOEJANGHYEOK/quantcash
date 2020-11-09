"""
    algorithm views
"""

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from ...models import Algorithm
from ...serializers import AlgorithmSerializer
from ...util.decorator import catch_bad_request
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from typing import Dict, Any


@api_view(['GET', 'POST'])
@authentication_classes((SessionAuthentication, BasicAuthentication))
@permission_classes((IsAuthenticated,))
@catch_bad_request
def get_or_post_algorithms(request: Request) -> Response:
    """api endpoint for algorithm lists"""
    if request.method == 'POST':
        data = request.data
        data.update({'author': request.user.id})
        serializer = AlgorithmSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        algorithms = Algorithm.objects.filter(**request.query_params)
        response = AlgorithmSerializer(algorithms, many=True)
        return Response(response.data, status=status.HTTP_200_OK)