#!/bin/bash

wget -qO- http://localhost:8086/?file=foo
wget -qO- http://localhost:8086/?file=bar
wget -qO- http://localhost:8086/?file=boom

