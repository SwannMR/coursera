FROM python:2.7

RUN pip install --upgrade --no-cache-dir https://get.dato.com/GraphLab-Create/1.8.5/swannmr@gmail.com/86D3-62A9-38D9-A2F4-83E6-61F9-1CAB-0409/GraphLab-Create-License.tar.gz
RUN pip install ipython jupyter


WORKDIR /learning
EXPOSE 8888
EXPOSE 7777
CMD ipython notebook --no-browser --ip='*'


